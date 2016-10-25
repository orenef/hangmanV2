/**
 * Created by Oren.Efraim on 10/25/2016.
 */

export default class stickmanService {
    constructor() {
        this.stickmanElement = document.createElement("canvas");
        this.stickmanElement.width = "700";
        this.stickmanElement.height = "500";
        this.stickmanContext = this.stickmanElement.getContext('2d');
        this.stickmanContext.beginPath();
        this.stickmanContext.strokeStyle = "#000000";
        this.stickmanContext.lineWidth = 4;

        let rightLegCoordinates = {
            x1: 296,
            y1: 190,
            x2: 312,
            y2: 210
        }
        let leftLegCoordinates = {
            x1: 296,
            y1: 190,
            x2: 280,
            y2: 210
        }

        let rightArmCoordinates = {
            x1: 296,
            y1: 190,
            x2: 312,
            y2: 210
        }

        let leftArmCoordinates = {
            x1: 296,
            y1: 140,
            x2: 280,
            y2: 170
        }

        let torsoCoordinates = {
            x1: 296,
            y1: 132,
            x2: 296,
            y2: 190
        };

        let frame4Coordinates = {
            x1: 296,
            y1: 100,
            x2: 296,
            y2: 120
        }

        let frame3Coordinates = {
            x1: 200,
            y1: 100,
            x2: 300,
            y2: 100
        }

        let frame2Coordinates = {
            x1: 200,
            y1: 0,
            x2: 200,
            y2: 600
        };

        let frame1Coordinates = {
            x1: 200,
            y1: 490,
            x2: 500,
            y2: 490
        };

        this.stickmanPartsElement = [rightLegCoordinates, leftLegCoordinates, rightArmCoordinates, leftArmCoordinates, torsoCoordinates, frame4Coordinates, frame3Coordinates, frame2Coordinates, frame1Coordinates];
    };


    get canvas() {
        return this.stickmanElement;
    }

    get context() {
        return this.stickmanContext;
    }

    donothing() {
        console.log("b");
    }

    _drawStraightLine(coordinates) {
        this.stickmanContext.moveTo(coordinates.x1, coordinates.y1);
        this.stickmanContext.lineTo(coordinates.x2, coordinates.y2);
        this.stickmanContext.stroke();
    }
    ;

    _drawTheHead = function () {
        this.stickmanContext.beginPath();
        this.stickmanContext.arc(296, 127, 10, 0, Math.PI * 2, true);
        this.stickmanContext.stroke();
    };

    /**
     * This method draw part of the stickman on the canvas, depend on the the lives(geuss) remaining
     * @param lives - number of guess left
     * @returns object {x1 y1 x2 y2 } represent the element that was draw
     */
    drawTheStickmanfunction(lives) {
        if (lives == 0) {
            this._drawTheHead();
            return {
                x1: 296,
                y1: 127,
                x2: 10,
                y2: 0
            };
        } else {
            this._drawStraightLine(this.stickmanPartsElement[lives - 1]);
            return this.stickmanPartsElement[lives - 1];
        }
        return true;
    };


}