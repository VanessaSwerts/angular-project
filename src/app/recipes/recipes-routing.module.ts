import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";

const recipesRoutes: Routes = [
    {
        path: 'recipes', 
        component: RecipesComponent,
        canActivate: [AuthGuard], 
        children: [
            { path: '', component: RecipesStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}