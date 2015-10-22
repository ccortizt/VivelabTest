function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 48));
items.push(new Item('Elixir of the Mongoose', -1, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', -10, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 2, 46));
items.push(new Item('Conjured Mana Cake', 5, 4));

function update_quality() {
    for (var i = 0; i < items.length; i++) {
        
        if (!isSulfuras(items[i].name)) {
            if (isConjured(items[i].name)) {
                decreaseConjuredQuality(items[i]);
            } else {
                updateNonConjuredItemsQuality(items[i]);
            }

            decrementSellIn(items[i]);

            if (isPassedDateSell(items[i].sell_in)) {
                updateQualityPassedDateSell(items[i]);
            }
        }

    }

}

checkUpdate();

function checkUpdate() {
    for (var i = 0; i < items.length; i++) {
        console.log(items[i].name + " quality " + items[i].quality + " sellin " + items[i].sell_in);
    }
}

function isSulfuras(itemName) {
    if (itemName == 'Sulfuras, Hand of Ragnaros') {
        return true;
    } else {
        return false;
    }
}

function isBackStagePass(itemName) {
    if (itemName == 'Backstage passes to a TAFKAL80ETC concert') {
        return true;
    } else {
        return false;
    }
}

function isAgedBrie(itemName) {
    if (itemName == 'Aged Brie') {
        return true;
    } else {
        return false;
    }
}

function isConjured(itemName) {
    if (itemName.indexOf("Conjured") > -1) {
        return true;
    } else {
        return false;
    }
}

function isPassedDateSell(itemSellIn) {
    if (itemSellIn < 0) {
        return true;
    } else {
        return false;
    }
}

function hasLessThanMaxQuality(itemQuality) {
    if (itemQuality < 50) {
        return true;
    } else {
        return false;
    }
}

function hasMoreThanMinQuality(itemQuality) {
    if (itemQuality > 0) {
        return true;
    } else {
        return false;
    }
}

function decrementSellIn(item) {
    item.sell_in = item.sell_in - 1;
}

function increaseQuality(item) {
    item.quality = item.quality + 1;
}

function decreaseQuality(item, qualityUnits) {
    item.quality = item.quality - qualityUnits;
}

function updateBackStagePass(item) {
    if (item.sell_in < 11) {
        if (hasLessThanMaxQuality(item.quality)) {
            increaseQuality(item);
        }
    }
    if (item.sell_in < 6) {
        if (hasLessThanMaxQuality(item.quality)) {
            increaseQuality(item);
        }
    }
}

function decreaseConjuredQuality(item) {
    if (item.quality > 1) {
        decreaseQuality(item, 2);
    } else {
        decreaseQuality(item, item.quality);
    }

}

function updateNonConjuredItemsQuality(item) {
    if (!isAgedBrie(item.name) && !isBackStagePass(item.name)) {

        if (hasMoreThanMinQuality(item.quality)) {
            decreaseQuality(item, 1);
        }
    } else {
        updateSpecialItem(item);
    }
}

function updateSpecialItem(item) {
    if (hasLessThanMaxQuality(item.quality)) {
        increaseQuality(item);
        if (isBackStagePass(item.name)) {
            updateBackStagePass(item);
        }
    }
}

function updateQualityPassedDateSell(item) {
    if (!isConjured(item.name)) {
        if (!isAgedBrie(item.name)) {
            if (!isBackStagePass(item.name)) {
                if (hasMoreThanMinQuality(item.quality)) {
                    decreaseQuality(item, 1);
                }
            } else {
                decreaseQuality(item, item.quality);
            }
        } else {
            if (hasLessThanMaxQuality(item.quality)) {
                increaseQuality(item);
            }
        }
    } else {
        decreaseConjuredQuality(item);
    }
}


