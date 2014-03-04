$(document).ready(function() {
    initDom();
});

function checkin() {
    navigator.geolocation.getCurrentPosition(onSuccess);
}

function onSuccess(position) {
    var geocoder = new google.maps.Geocoder();
//    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var latlng = new google.maps.LatLng($('#latitude').val(), $('#longitude').val());
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log('country: ' + findElement(results, 'country').join());
            console.log('administrative_area_level_1: ' + findElement(results, 'administrative_area_level_1').join());
            console.log('administrative_area_level_2: ' + findElement(results, 'administrative_area_level_2').join());
            console.log('administrative_area_level_3: ' + findElement(results, 'administrative_area_level_3').join());
            console.log('locality: ' + findElement(results, 'locality').join());
            console.log('sublocality: ' + findElement(results, 'sublocality').join());
            console.log('neighborhood: ' + findElement(results, 'neighborhood').join());
            console.log('political: ' + findElement(results, 'political').join());

            var level2 = findElement(results, 'country')[0];
            var level1 = findContinentByCountry(level2);
            var level3 = findElement(results, 'administrative_area_level_1')[0];
            var level4 = findElement(results, 'administrative_area_level_3')[0];

            // checking level1
            $('#level1_world_' + level1).addClass('solved');

            // checkin level2
            $('#level2_' + level1 + '_' + level2).addClass('solved');

            // checking level3
            $('#level3_' + level1 + '_' + level2 + '_' + level3).addClass('solved');

            // checking level4
            $('#level4_' + level1 + '_' + level2 + '_' + level3 + '_' + level4).addClass('solved');
        }
    });
}

function findElement(results, type) {
    var elements = [];
    for (var i = 0; i < results.length; i++) {
        if (results[i].types.indexOf(type) != -1) {
            elements.push(results[i].address_components[0].long_name.toLowerCase().replace(' ', '').replace('-', ''));
        }
    }

    return elements;
}

function initDom() {
    $('#list').append(createList('world', 'level1', level1));
    for (var i = 0; i < level1.length; i++) {
        var level1element = getElementFromLevel1(i);
        $('#list').append(createList(level1element, 'level2', level2[level1element]));
        for (var j = 0; j < level2[level1element].length; j++) {
            var level2element = getElementFromLevel2(level1element, j);
            $('#list').append(createList(level1element + '_' + level2element, 'level3', level3[level1element][level2element]));
            for (var k = 0; k < level3[level1element][level2element].length; k++) {
                var level3element = getElementFromLevel3(level1element, level2element, k);
                $('#list').append(createList(level1element + '_' + level2element + '_' + level3element, 'level4', level4[level1element][level2element][level3element]));
            }
        }
    }

    $('.level1 li').click(function() {
        $('.level2').hide();
        $('.level3').hide();
        $('.level4').hide();
        $('.level2.' + $(this).attr('id').substr(13)).show();
    });
    $('.level2 li').click(function() {
        $('.level3').hide();
        $('.level4').hide();
        $('.level3.' + $(this).attr('id').substr(7)).show();
    });
    $('.level3 li').click(function() {
        $('.level4').hide();
        $('.level4.' + $(this).attr('id').substr(7)).show();
    });
}

function getElementFromLevel1(index) {
    return level1[index];
}

function getElementFromLevel2(level1element, index) {
    return level2[level1element][index];
}

function getElementFromLevel3(level1element, level2element, index) {
    return level3[level1element][level2element][index];
}

function createList(base, level, elements) {
    var list = $('<ul class="' + level + ' ' + base + '"></ul>');
    var subElements = null;
    var name = '';
    for (var i = 0; i < elements.length; i++) {
        subElements = getElements(level, base, elements[i]);
        name = elements[i];
        if (subElements && subElements.length > 0) {
            name += ' ( / ' + subElements.length + ')';
        }
        list.append($('<li id="' + level + '_' + base + '_' + elements[i] + '">' + name + '</li>'));
    }

    return list;
}

function getElements(level, base, currentElement) {
    var element = null;
    if (level == 'level1') {
        element = level2;
    } else if (level == 'level2') {
        element = level3;
    } else if (level == 'level3') {
        element = level4;
    } else if (level == 'level4') {
        return null;
    }
    var parts = base.split('_');
    for(var i = 0; i < parts.length; i++) {
        if (parts[i] == 'world') continue;
        element = element[parts[i]];
    }

    return element[currentElement];
}

function findContinentByCountry(country) {
    if (level2.europe.indexOf(country) != -1) {
        return 'europe';
    } else if (level2.northamerica.indexOf(country) != -1) {
        return 'northamerica';
    } else if (level2.southamerica.indexOf(country) != -1) {
        return 'southhamerica';
    } else if (level2.asia.indexOf(country) != -1) {
        return 'asia';
    } else if (level2.africa.indexOf(country) != -1) {
        return 'africa';
    } else if (level2.oceania.indexOf(country) != -1) {
        return 'oceania';
    } else {
        return '';
    }
}
