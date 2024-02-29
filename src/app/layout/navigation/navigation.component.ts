import { Component, Inject, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Auth0Roles } from 'src/app/shared/enums/auth0-roles.enum';
import { environment } from 'src/environments/environment';
import { filter, startWith } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';

type NavigationItem = {
    routerLink: string;
    svgIcon: string;
    title: string;
    requiredRoles?: Auth0Roles[];
    children?: Omit<NavigationItem, 'svgIcon' | 'children' | 'viewExpanded'>[];
    viewExpanded?: boolean;
};

type AssetIcon = {
    name: string;
    path: string;
};

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    isNavigationMenuOpen = false;
    navigationMenuWidth = 56;
    sidenavContentLeftMargin = 60;

    userName: string = '';
    fullName: string = '';
    emailId: string = '';
    currentYear = new Date().getFullYear();
    currentRoute: string = '';

    currentUserRoles: Auth0Roles[] = [];

    allNavigationItems: NavigationItem[] = [
        {
            routerLink: '/dashboard',
            svgIcon: 'home',
            title: 'Pantry',
            // requiredRoles: [],
        },
        {
        routerLink: 'dashboard/aboutus',
        svgIcon: 'feed',
        title: ' About Us',
        // requiredRoles: [],
        },
        // {
        //     routerLink: 'dashboard/beverages',
        //     svgIcon: 'beverages',
        //     title: ' Beverages',
        //     // requiredRoles: [],
        // },
        // {
        //     routerLink: 'dashboard/allitems',
        //     svgIcon: 'all',
        //     title: ' All Items',
        //     // requiredRoles: [],
        // },
        // {
        //     routerLink: 'dashboard/edititem',
        //     svgIcon: 'allitems',
        //     title: ' Edit Item',
        //     // requiredRoles: [],
        // },
        // {
        //     routerLink: '/settings',
        //     svgIcon: 'settings',
        //     title: 'Settings',
        //     // requiredRoles: [Auth0Roles.ADMIN],
        //     viewExpanded: false,
        //     children: [
        //         {
        //             routerLink: '/settings/users',
        //             title: 'Item Management',
        //             // requiredRoles: [Auth0Roles.ADMIN],
        //         },
        //     ],
        // },
    ];
    filteredNavigationItems: NavigationItem[] = [];

    icons: AssetIcon[] = [
        { name: 'avatar', path: 'assets/images/icons/avatar.svg' },
        { name: 'close', path: 'assets/images/icons/close.svg' },
        { name: 'dashboard', path: 'assets/images/icons/dashboard.svg' },
        { name: 'home', path: 'assets/images/icons/home.svg' },
        { name: 'meltwater', path: 'assets/images/icons/meltwater.svg' },
        { name: 'menu', path: 'assets/images/icons/menu.svg' },
        { name: 'settings', path: 'assets/images/icons/settings.svg' },
        { name: 'allitems', path: 'assets/images/icons/allitems.svg' },
        { name: 'snacks', path: 'assets/images/icons/snacks.svg' },
        { name: 'beverages', path: 'assets/images/icons/beverages.svg' },
        { name: 'all', path: 'assets/images/icons/all.svg' },
        { name: 'feed', path: 'assets/images/icons/feed.svg' },
    ];

    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private router: Router,
        private auth: AuthService,
        private loginService: LoginService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.icons.forEach((icon) => this.setupIcon(icon));
    }

    ngOnInit() {
        this.closeNavigationMenu();

        // /** Auth0 Setup */
        this.auth.user$.subscribe((user) => {
            // this.currentUserRoles =
            //     user![environment.auth0RolesNamespace].authorizationRoles || [];
            // this.filterNavigationItemsForUser();

            //     this.emailId = user!.email ? user!.email : '';
            //     if (user!.nickname) {
            //         const [firstName, secondName] = user!.nickname.split('.');
            //         this.userName = `${
            //             firstName ? firstName : ''
            //         }${secondName?secondName:''}`;
            //         this.fullName = `${firstName} ${secondName?secondName:''}`;
            //     } else {
            //         this.userName = '';
            //         this.fullName = '';
            //     }
            // });

            this.emailId = user!.email ? user!.email : '';
            if (user!.nickname) {
                const [firstName, secondName] = user!.nickname.split('.');
                this.userName = `${
                    firstName?.charAt(0) ? firstName.charAt(0) : ''
                }${secondName?.charAt(0) ? '' + secondName.charAt(0) : ''}`;
                this.fullName = `${firstName} ${secondName}`;
            } else {
                this.userName = '';
                this.fullName = '';
            }
        });

        /** Setup title in toolbar */
        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd
                ),
                startWith(this.router)
            )
            .subscribe((event) => {
                const url = event.url;
                this.currentRoute =
                    this.allNavigationItems.find((navigationItem) =>
                        url.includes(navigationItem.routerLink)
                    )?.title || 'Pantry';
            });
    }

    private setupIcon(icon: AssetIcon) {
        this.iconRegistry.addSvgIcon(
            icon.name,
            this.sanitizer.bypassSecurityTrustResourceUrl(icon.path)
        );
    }

    // private filterNavigationItemsForUser() {
    //     this.filteredNavigationItems = this.allNavigationItems.filter(
    //         (navigationItem) => {
    //             if (navigationItem.requiredRoles.length > 0)
    //                 return navigationItem.requiredRoles.some((role) =>
    //                     this.currentUserRoles.includes(role)
    //                 );
    //             return true;
    //         }
    //     );
    // }

    openNavigationMenu() {
        this.isNavigationMenuOpen = true;
        this.navigationMenuWidth = 265;
    }

    closeNavigationMenu() {
        this.isNavigationMenuOpen = false;
        this.navigationMenuWidth = 56;
    }

    logout() {
        this.auth.logout({ returnTo: this.document.location.origin });
        // this.loginService.logout();
    }
}
