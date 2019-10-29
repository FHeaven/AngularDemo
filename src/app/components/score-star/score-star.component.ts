import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-score-star',
    templateUrl: './score-star.component.html',
    styleUrls: ['./score-star.component.scss']
})
export class ScoreStarComponent implements OnInit {

    @Input()
    score = 0;

    @Input()
    totalScore = 10;

    @Input()
    displayStars = 5;

    @Input()
    fontSize = 'initial';

    lstStarClass = [];

    ngOnInit(): void {
        let cal = 0;
        const starCount = this.score * this.displayStars / this.totalScore;
        const floorValue = Math.floor(starCount);
        const ceilValue = Math.ceil(starCount);
        for (; cal < floorValue; cal++) {
            this.lstStarClass.push('fa-star text-warning');
        }
        for (; cal < ceilValue; cal++) {
            this.lstStarClass.push('fa-star-half-o text-warning');
        }
        for (; cal < this.displayStars; cal++) {
            this.lstStarClass.push('fa-star-o text-warning');
        }
    }

}
