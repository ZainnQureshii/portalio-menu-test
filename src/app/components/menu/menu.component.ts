import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  parentElem: HTMLElement;
  floatingElem: HTMLElement;
  floatingElemContent: string;

  constructor() {}

  handleClick(e) {
    e.stopPropagation();

    const menuElement = e.target;
    this.floatingElemContent = `Copy to ${menuElement.innerText}`;
    const offsetTop = menuElement.offsetTop;
    const offsetHeight = menuElement.offsetHeight;

    this.parentElem = this.findMainParentElement(menuElement.parentNode);
    this.parentElem.classList.add('menu-hide-panel');
    this.floatingElem = document.querySelector(
      '.menu-hide-panel .floating-element'
    );

    this.floatingElem.classList.add('show');
    const floatingElemPosition = offsetTop + offsetHeight / 2;
    this.floatingElem.style.top = `${floatingElemPosition}px`;

    const rectParent = this.parentElem.getBoundingClientRect();
    const rectFloatingElem = this.floatingElem.getBoundingClientRect();
    const floatElemPosition = rectFloatingElem.top - rectParent.top;
    const floatingElemBottom =
      floatElemPosition + this.floatingElem.offsetHeight;

    if (floatingElemBottom > this.parentElem.offsetHeight) {
      const subtract = floatingElemBottom - this.parentElem.offsetHeight;
      this.floatingElem.style.top = `${floatingElemPosition - subtract}px`;
    } else if (rectFloatingElem.top < rectParent.top) {
      const subtract = rectParent.top - rectFloatingElem.top;
      this.floatingElem.style.top = `${floatingElemPosition + subtract}px`;
    }
  }

  findMainParentElement(element) {
    if (!element.classList.contains('mat-menu-panel')) {
      return this.findMainParentElement(element.parentNode);
    }
    return element;
  }

  menuClosed(e) {
    if (this.parentElem && this.floatingElem) {
      setTimeout(() => {
        this.parentElem.classList.remove('menu-hide-panel');
        this.floatingElem.classList.remove('show');
      }, 100);
    }
    if (e?.target) e.stopPropagation();
  }

  ngOnInit(): void {}
}
