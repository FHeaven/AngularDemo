import { Component, OnInit } from '@angular/core';
import { LoginApiService, GetLoginDataApiService } from 'app/services/api';
import { ApiResponseInfo, LoginDataInfo } from 'app/domain';
import { FoundationService, ProgCodeDataService } from 'app/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    myStyle: any;
    myParams: any;
    width = 100;
    height = 98;
    userId = '';
    password = '';

    constructor(
        private loginSvc: LoginApiService,
        private foundationSvc: FoundationService,
        private progCodeDataSvc: ProgCodeDataService,
        private loginDataApiSvc: GetLoginDataApiService,
        private router: Router
    ) { }

    ngOnInit() {
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '98%',
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };

        this.myParams = {
            'particles': {
                'number': {
                    'value': 80,
                    'density': {
                        'enable': true,
                        'value_area': 800
                    }
                },
                'color': {
                    'value': '#ffc107'
                },
                'shape': {
                    'type': 'star',
                    'stroke': {
                        'width': 0,
                        'color': '#ffc107'
                    },
                    'polygon': {
                        'nb_sides': 5
                    },
                    'image': {
                        'src': '',
                        'width': 120,
                        'height': 140
                    }
                },
                'opacity': {
                    'value': 0.5,
                    'random': false,
                    'anim': {
                        'enable': false,
                        'speed': 1,
                        'opacity_min': 0.1,
                        'sync': false
                    }
                },
                'size': {
                    'value': 7,
                    'random': true,
                    'anim': {
                        'enable': false,
                        'speed': 40,
                        'size_min': 0.1,
                        'sync': false
                    }
                },
                'line_linked': {
                    'enable': false,
                    'distance': 150,
                    'color': '#ffffff',
                    'opacity': 0.4,
                    'width': 1
                },
                'move': {
                    'enable': true,
                    'speed': 1,
                    'direction': 'none',
                    'random': false,
                    'straight': false,
                    'out_mode': 'out',
                    'bounce': false,
                    'attract': {
                        'enable': false,
                        'rotateX': 600,
                        'rotateY': 1200
                    }
                }
            },
            'interactivity': {
                'detect_on': 'canvas',
                'events': {
                    'onhover': {
                        'enable': false,
                        'mode': 'grab'
                    },
                    'onclick': {
                        'enable': false,
                        'mode': 'bubble'
                    },
                    'resize': true
                },
                'modes': {
                    'grab': {
                        'distance': 400,
                        'line_linked': {
                            'opacity': 1
                        }
                    },
                    'bubble': {
                        'distance': 400,
                        'size': 40,
                        'duration': 2,
                        'opacity': 8,
                        'speed': 3
                    },
                    'repulse': {
                        'distance': 200,
                        'duration': 0.4
                    },
                    'push': {
                        'particles_nb': 4
                    },
                    'remove': {
                        'particles_nb': 2
                    }
                }
            },
            'retina_detect': true
        };
    }

    login() {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.loginSvc.call({
            requestJson: {
                user_id: this.userId,
                password: this.foundationSvc.encodeMD5(this.password)
            },
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                this.progCodeDataSvc.storeToken(response.responseObject);
                this.progCodeDataSvc.setCurrentPage('首页');
                this.router.navigate(['dream/home']).then(() => {
                    this.foundationSvc.closeProcessLayer(layerIndex);
                });
            },
            onFailed: (error: ApiResponseInfo<string>) => {
                this.foundationSvc.onError('登录失败', error.message);
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

}
