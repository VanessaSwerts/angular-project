import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>()
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, updatedRecipe: Recipe,) {
        this.recipes[index] = updatedRecipe;
        this.recipeChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice())
    }
}




    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'This is simply a test ',
    //         'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]
    //     ),
    //     new Recipe(
    //         'A Test Recipe 2',
    //         'This is simply a test ',
    //         'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 20),
    //             new Ingredient('Tomate', 1)
    //         ]
    //     )
    // ];