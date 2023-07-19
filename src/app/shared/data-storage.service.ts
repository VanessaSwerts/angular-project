import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private databaseURL: string = 'https://angular-project-1e209-default-rtdb.firebaseio.com/';
  private recipesEndpoint = 'recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        this.databaseURL + this.recipesEndpoint,
        recipes
      )
      .subscribe(() => alert('Your recipes have been successfully saved!'));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        this.databaseURL + this.recipesEndpoint
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            const ingredients = recipe.ingredients ? recipe.ingredients : [];
            return { ...recipe, ingredients: ingredients }
          })
        }),
        tap(recipes => this.recipeService.setRecipes(recipes))
      )
  }
}