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

  openFloatElem(e) {
    e.stopPropagation();

    const menuElement = e.target;
    this.floatingElemContent = this.getElemText(menuElement);

    const offsetTop = menuElement.offsetTop;
    const offsetHeight = menuElement.offsetHeight;

    this.parentElem = this.findMainParentElem(menuElement.parentNode);
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

  getElemText(element) {
    let text: string;
    element.childNodes.forEach((elem) => {
      if (elem.nodeType === Node.TEXT_NODE) {
        text = elem.textContent;
      }
    });
    return `Copy to ${text}`;
  }

  findMainParentElem(element) {
    if (!element.classList.contains('mat-menu-panel')) {
      return this.findMainParentElem(element.parentNode);
    }
    return element;
  }

  hideFloatingElem(e: MouseEvent) {
    if (e?.target) {
      e.stopPropagation();
    }

    if (this.parentElem && this.floatingElem) {
      setTimeout(() => {
        this.parentElem.classList.remove('menu-hide-panel');
        this.floatingElem.classList.remove('show');
      }, 100);
    }
  }

  openDropdown(e) {
    e.stopPropagation();
    const element = e.currentTarget;
    if (!element.classList.contains('open')) {
      element.classList.add('open');
    } else element.classList.remove('open');
  }

  ngOnInit(): void {}
}
