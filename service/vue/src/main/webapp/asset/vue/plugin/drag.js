/**
 * Created by bqxu on 16/3/2.
 */
export class Drag {

  constructor(el, {
    lockX=false,
    lockY=false,
    container=document.documentElement || document.body
    }) {
    this.el = this.$(el);
    this.x = this.y = 0;
    this.lockX = lockX;
    this.lockY = lockY;
    this.container = this.$(container);
    this.el.style.cursor = "move";
    console.log(this.maxLeft());
    console.log(this.maxTop());
    this.reset();
    this.active = false;
    this.el.addEventListener("mousedown", (event)=> {
      this.active = true;
      event = event || window.event;
      this.x = event.clientX - this.el.offsetLeft;
      this.y = event.clientY - this.el.offsetTop;
      event.preventDefault && event.preventDefault();
      this.el.setCapture && this.el.setCapture();
      this.startHandler && this.startHandler();
    });
    this.el.addEventListener("mousemove", (event) => {
      event = event || window.event;
      if (this.active) {
        this.move(event.clientX - this.x, event.clientY - this.y);
      }
      event.preventDefault && event.preventDefault();
      this.moveHandler && this.moveHandler();
    });
    this.el.addEventListener('mouseup', (event)=> {
      if (this.active) {
        this.move(event.clientX - this.x, event.clientY - this.y);
      }
      this.active = false;
      this.el.releaseCapture && this.el.releaseCapture();
      this.stopHandler && this.stopHandler();
    });
  }

  maxTop() {
    return Math.max(this.container.clientHeight, this.container.scrollHeight) - this.el.offsetHeight;
  }

  maxLeft() {
    return Math.max(this.container.clientWidth, this.container.scrollWidth) - this.el.offsetWidth;
  }

  move(x, y) {
    if (!this.lockX && x > 0 && x < this.maxLeft()) {
      this.el.style.left = x + "px";
    }
    if (!this.lockY && y > 0 && y < this.maxTop()) {
      this.el.style.top = y + "px";
    }
  }

  onStart(startHandler) {
    this.startHandler = startHandler;
  }

  onMove(moveHandler) {
    this.moveHandler = moveHandler;
  }

  onStop(stopHandler) {
    this.stopHandler = stopHandler;
  }


  $(id) {
    return typeof id === "string" ? document.getElementById(id) : id
  }

  reset() {
    this.el.style.top = this.el.offsetTop + "px";
    this.el.style.left = this.el.offsetLeft + "px";
    this.el.style.position = "absolute";
    this.el.style.margin = "0"
  }

}



