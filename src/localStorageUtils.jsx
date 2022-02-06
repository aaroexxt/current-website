//Functions adapted from: https://stackoverflow.com/questions/14555347/how-to-store-data-in-localstorage

export const localStorageSave = (key, value) => {
    const now = new Date()

    // `item` is an object which contains the original value
	// as well as the time when it's supposed to expire

    const ttl = 1000;//(1000 * 60 * 60 * 24); // 24 hours

    const item = {
		value: value,
		expiry: now.getTime() + ttl, //getTime returns milliseconds, so add ttl to get expiry time
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export const localStorageGet = key => {
    return null;
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
    try {
        const item = JSON.parse(itemStr)
        // compare the expiry time of the item with the current time
        if (new Date().getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }

        // If we made it this far, the item is not expired,
        // so we return the value
        return item.value
    } catch(e) {
        // If we got here, there was a problem parsing the item
        return null;
    }
}