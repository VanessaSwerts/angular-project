import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg')
  ];

  constructor() { }

}
