import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test ', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg'),
        new Recipe('A Test Recipe 2 ', 'This is simply a test 2', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg'),
        new Recipe('A Test Recipe 3', 'This is simply a test 3', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}