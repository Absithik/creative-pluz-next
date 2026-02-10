


export const STUDIO_IMAGES = [
    "/assets/images/service/BROUCHURE/1.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_02.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_03.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_04.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_05.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_06.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_07.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_08.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_09.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_10.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_11.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_12.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_13.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_14.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_15.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_16.png",
    "/assets/images/service/BROUCHURE/C PLUS 1080 X 1350_17.png",
    "/assets/images/service/BROUCHURE/Creative 2540 x 3368_18.png",
    "/assets/images/service/BROUCHURE/Creative 2540 x 3368_19.png",
    "/assets/images/service/BROUCHURE/Creative 2540 x 3368_20.png",
    "/assets/images/service/BROUCHURE/Creative 2540 x 3368_21.png",

];

// Helper to shuffle array for randomness in rows
export const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};