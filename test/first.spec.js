/**
 * Created by Oren.Efraim on 10/25/2016.
 */
import stickmanCanvas from '../src/controller/stickmanService';

describe("Stickman canvas testing", function(){

    let mycanvas;

    beforeEach(function() {
         mycanvas = new stickmanCanvas();
    });

    afterEach(function() {

    });

    it("Canvas Initialization Test", function() {
        expect(mycanvas.canvas).toBeDefined();
        expect(mycanvas.context).toBeDefined();
    });



});


