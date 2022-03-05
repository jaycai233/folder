import { Component } from '@angular/core';
import { NodeModel } from './folder-component/NodeModal.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'folder-structure';

  node: NodeModel = {
    type: 'folder',
    name: 'root',
    id: '1',
    children: []
  };

  deleteChild(id: string): void {
    if (this.node.children) {
      this.node.children = this.node.children.filter(item => item.id !== id);
    }
  }

  addFolder(): void {
    if (!this.node.children) {
      this.node.children = [];
    }

    const newNode: NodeModel = {
      type: 'folder',
      id: (this.node.children.length + 1).toString()
    };
    this.node.children.push(newNode);
  }
}
