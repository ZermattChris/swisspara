// import { atom, map, action } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent';
import { computed } from 'nanostores';


import { atom } from 'nanostores';

// export const $counter = atom(7);


// export const isOpen = atom('boo!');


export const pageItems = persistentMap({});
export const currentPageIndex = persistentAtom('page', 7);

// console.log(currentPageIndex.get())


// export function addCartItem({ index, pageName }) {
//     const existingEntry = $pageItems.get()[index];
//     if (!existingEntry) {
//         $pageItems.setKey(
//             index,
//             { pageName, completed: 0 }
//         );
//     }
//   }

// Set up the list of Navigation Page names. Called from App.
export function initNav(listOfPageNames) {
    //console.log('listOfPageNames', listOfPageNames)

    let x = 1;
    for (const aPage of listOfPageNames) {
        pageItems.setKey(
            x,
            { 'page': aPage, 'completed': 0 }
        );
        x++;
    }
    console.log('pageItems', pageItems.value);

}

// export const prev = action($counter, 'prev', (store) => {
//     _navigate(-1)
//   })



// Move to the previous page 
export function prev() {
    _navigate(-1);
}

// Move to the next page 
export function next() {
    _navigate(1);
}

// Navigate to a different page.
function _navigate(directionInt) {
    let targetIndx = currentPageIndex.get() + directionInt;

    console.log("currentPageIndex: ", currentPageIndex);
    console.log("targetIndx: ", targetIndx);
}


// Are we on the first Page?
export function isNavStart() {
    if (currentPageIndex == 1) return true;
    return false;
}
// Are we on the last Page?
export function isNavEnd() {
    if (currentPageIndex == pageItems.size) return true;
    return false;
}