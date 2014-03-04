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

            $('#country_' + findElement(results, 'country')[0]).addClass('solved');
        }
    });
}

function findElement(results, type) {
    elements = [];
    for (var i = 0; i < results.length; i++) {
        if (results[i].types.indexOf(type) != -1) {
            elements.push(results[i].address_components[0].long_name);
        }
    }

    return elements;
}

function initDom() {
    $('#list').append(createList('world', 'level1', level1));
    for (var i = 0; i < level1.length; i++) {
        $('#list').append(createList(level1[i], 'level2', level2[level1[i]]));
        for (var j = 0; j < level2[level1[i]].length; j++) {
            $('#list').append(createList(level1[i] + '_' + level2[level1[i]][j], 'level3', level3[level1[i]][level2[level1[i]][j]]));
        }
    }

    $('.level1 li').click(function() {
        $('.level2').hide();
        $('.level3').hide();
        $('.level2.' + $(this).attr('id').substr(13)).show();
    });
    $('.level2 li').click(function() {
        $('.level3').hide();
        $('.level3.' + $(this).attr('id').substr(7)).show();
    });
}

function createList(base, level, elements) {
    var list = $('<ul class="' + level + ' ' + base + '"></ul>');
    for (var i = 0; i < elements.length; i++) {
        list.append($('<li id="' + level + '_' + base + '_' + elements[i] + '">' + elements[i] + '</li>'));
    }

    return list;
}
