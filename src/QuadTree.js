// QuadTree.js

// Rectangle class represents a rectangular boundary
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;         // X-coordinate of the top-left corner
    this.y = y;         // Y-coordinate of the top-left corner
    this.width = width; // Width of the rectangle
    this.height = height; // Height of the rectangle
  }

  // Check if the rectangle contains a point
  contains(point) {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  // Check if the rectangle intersects with another rectangle (range)
  intersects(range) {
    return !(
      range.x + range.width < this.x ||
      range.y + range.height < this.y ||
      range.x > this.x + this.width ||
      range.y > this.y + this.height
    );
  }
}

// QuadTree class represents a QuadTree data structure for efficient collision detection
class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary; // Rectangle representing the boundary of this node
    this.capacity = capacity; // Maximum objects in a quadrant before subdivision
    this.objects = [];        // Array of game objects in this quadrant
    this.divided = false;     // Indicates if the tree is divided into quadrants
  }

  // Subdivide the quadtree into four quadrants
  subdivide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width;
    const h = this.boundary.height;
    const ne = new Rectangle(x + w / 2, y, w / 2, h / 2);
    const nw = new Rectangle(x, y, w / 2, h / 2);
    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    const sw = new Rectangle(x, y + h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(ne, this.capacity);
    this.northwest = new QuadTree(nw, this.capacity);
    this.southeast = new QuadTree(se, this.capacity);
    this.southwest = new QuadTree(sw, this.capacity);
    this.divided = true;
  }

  // Insert an object into the quadtree
  insert(object) {
    if (!this.boundary.contains(object)) {
      return; // Object is outside the boundary
    }

    if (this.objects.length < this.capacity) {
      this.objects.push(object); // Add the object to this quadrant
    } else {
      if (!this.divided) {
        this.subdivide(); // Subdivide if not already divided
      }

      // Add the object to the appropriate sub-quadrant
      this.northeast.insert(object);
      this.northwest.insert(object);
      this.southeast.insert(object);
      this.southwest.insert(object);
    }
  }

  // Return all objects that could collide with the given object
  query(object, found) {
    if (!found) found = [];

    if (!this.boundary.intersects(object.getBoundingBox())) {
      return found; // No intersection, return an empty array
    }

    for (const obj of this.objects) {
      if (object !== obj && object.intersects(obj)) {
        found.push(obj); // Add the object to the result array
      }
    }

    if (this.divided) {
      // Recursively search sub-quadrants
      this.northeast.query(object, found);
      this.northwest.query(object, found);
      this.southeast.query(object, found);
      this.southwest.query(object, found);
    }

    return found;
  }
}

export { QuadTree, Rectangle };
