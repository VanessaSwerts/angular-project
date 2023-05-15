import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test ',
            'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            'A Test Recipe 2',
            'This is simply a test ',
            'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1386/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2874-1-530x380-c.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 20),
                new Ingredient('Tomate', 1)
            ]
        )
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}