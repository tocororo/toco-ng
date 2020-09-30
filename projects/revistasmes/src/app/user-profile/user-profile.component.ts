/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserProfileService } from '@toco/tools/backend/user-profile.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    public user: UserProfile;

    public changePassword: string;

    constructor(
        private userProfileService: UserProfileService,
        private env: EnvService,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.changePassword = this.env.sceibaHost + 'account/settings/password/';
        this.user = new UserProfile();
        this.userProfileService.getUserInfo().subscribe({
            next: response => {
                console.log(response);
                if (response && response.data && response.data.userprofile) {
                    this.user.deepcopy(response.data.userprofile);
                }
            },
            error: err => { console.log(err) },
            complete: () => { }
        });

    }

    avatar(){
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.avatar);
    }


}
