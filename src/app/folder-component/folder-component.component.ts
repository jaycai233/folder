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
  childType: 'folder' | 'file' | 'unset' | null;
  inputName: string;

  constructor() {}

  ngOnInit(): void {}

  addChildNode(item: NodeModel): void {
    if (!this.inputName) {
      return;
    }
    if (!item.children) {
      item.children = [];
    }
    item.children.push({
      type: this.childType,
      name: this.inputName,
      id:
        item.children.length > 0
          ? (Number(item.children[item.children.length - 1].id) + 1).toString()
          : '1'
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

  setChildType(type: string): void {
    if (type) {
      switch (type) {
        case 'folder':
          this.childType = 'folder';
          break;
        case 'file':
          this.childType = 'file';
          break;
        default:
          this.childType = 'unset';
      }
      this.showCreateButton = false;
    }
  }

  clearInput(): void {
    this.inputName = '';
    this.childType = null;
  }

  updateSelfName(): void {
    if (!this.inputName) {
      this.deleteNode();
    }
    this.nodeList.name = this.inputName;
    this.clearInput();
  }
}
