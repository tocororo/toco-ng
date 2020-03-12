import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { Entity } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { DomSanitizer } from '@angular/platform-browser';

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
                    this.user.load_from_data(response.data.userprofile);
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

export class UserProfile extends Entity {
    biography: string = '';
    email: string = '';
    full_name: string = '';
    id: number = -1;
    institution: string = '';
    institution_id: number = -1;
    institution_rol: string = '';
    username: string = '';
    avatar: string = '';
}
