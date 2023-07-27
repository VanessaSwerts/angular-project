import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

import { environment } from "src/environment/environment"; 

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private recipesEndpoint = 'recipes.json';
  userToken: string;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        environment.databaseURL + this.recipesEndpoint,
        recipes
      )
      .subscribe(() => alert('Your recipes have been successfully saved!'));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        environment.databaseURL + this.recipesEndpoint
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            const ingredients = recipe.ingredients ? recipe.ingredients : [];
            return { ...recipe, ingredients: ingredients }
          })
        }),
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
  }
}