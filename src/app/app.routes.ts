import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/welcome/welcome.component').then(m => m.WelcomeComponent),
        data: { title: 'appTitles.welcomeTitle' }
    },
    {
        path: 'welcome',
        loadComponent: () => import('./features/welcome/welcome.component').then(m => m.WelcomeComponent),
        data: { title: 'appTitles.welcomeTitle' }
    },
    {
        path: 'generic-list/:listId',
        loadComponent: () => import('./shared/components/generic-list/generic-list.component').then(m => m.GenericListComponent),
        data: { title: 'appTitles.appTitle' }
    },
    {
        path: 'create-form',
        loadComponent: () => import('./features/form/create-form/create-form.component').then(m => m.CreateFormComponent),
        data: { title: 'appTitles.createTitle' }
    },
    {
        path: 'edit-form/:id',
        loadComponent: () => import('./features/form/edit-form/edit-form.component').then(m => m.EditFormComponent),
        data: { title: 'appTitles.editTitle' }
        // outlet: 'add-item-form'
    },
    {
        path: 'carousel',
        loadComponent: () => import('./shared/components/carousel/carousel.component').then(m => m.CarouselComponent),
        // data: { title: 'appTitles.welcomeTitle' }
    },
];
