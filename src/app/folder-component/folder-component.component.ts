import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeModel } from './NodeModal.model';

@Component({
  selector: 'app-folder-component',
  templateUrl: './folder-component.component.html',
  styleUrls: ['./folder-component.component.css']
})
export class FolderComponentComponent implements OnInit {
  @Input() nodeList: NodeModel;
  @Output() deleteFromParent = new EventEmitter<string>();
  showCreateButton = false;
  type: 'folder' | 'file' | 'unset' | null;
  inputName: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.nodeList.name) {
      this.type = 'folder';
    }
    console.log(this.nodeList);
  }

  addNode(item: NodeModel): void {
    if (!this.inputName) {
      return;
    }
    if (!item.children) {
      item.children = [];
    }
    item.children.push({
      type: this.type,
      name: this.inputName,
      id: (item.children.length + 1).toString()
    });
    this.clearInput();
  }

  deleteNode(): void {
    this.deleteFromParent.emit(this.nodeList.id);
  }

  deleteChild(id: string): void {
    if (this.nodeList.children) {
      this.nodeList.children = this.nodeList.children.filter(
        item => item.id !== id
      );
    }
  }

  setType(type: string): void {
    if (type) {
      switch (type) {
        case 'folder':
          this.type = 'folder';
          break;
        case 'file':
          this.type = 'file';
          break;
        default:
          this.type = 'unset';
      }
      this.showCreateButton = false;
    }
  }

  clearInput(): void {
    this.inputName = '';
    this.type = null;
  }

  updateSelfName(): void {
    if (!this.inputName) {
      this.deleteNode();
    }
    this.nodeList.name = this.inputName;
    this.clearInput();
  }
}
