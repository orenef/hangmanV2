/**
 * Created by Oren.Efraim on 10/27/2016.
 */
export default class SticmanPaint {

    static showNumberOfGuessingLeft(stickmanDivElement,lives){
        stickmanDivElement.className = `stickman-number-of-guess-left-${lives}`
    }
}