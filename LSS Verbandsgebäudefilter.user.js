// ==UserScript==
// @name         LSS Verbandsgebäudefilter
// @namespace    www.leitstellenspiel.de
// @version      1.0
// @description  Fügt Filterbuttons für verschiedene Gebäudearten hinzu.
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/verband/gebauede
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    let activeType = null;

    function addFilterButtons() {
        const panelHeading = document.querySelector('.panel-heading');
        const buildingTypes = [
            { type: 'building_hospital', label: 'Krankenhäuser' },
            { type: 'building_polizeiwache', label: 'Zelle' },
            { type: 'building_fireschool', label: 'Feuerwehrschule' },
            { type: 'building_polizeischule', label: 'Polizeischule' },
            { type: 'building_rettungsschule', label: 'Rettungsschule' },
            { type: 'building_thw_school', label: 'THW-Schule' }
        ];

        buildingTypes.forEach(info => {
            const button = document.createElement('button');
            button.textContent = info.label;
            button.className = 'btn btn-xs btn-default';
            button.addEventListener('click', () => filterBuildings(info.type, button));
            panelHeading.appendChild(button);
            //console.log('Button added:', info.label);
        });
    }

    function filterBuildings(buildingType, clickedButton) {
        const rows = document.querySelectorAll('#alliance_buildings_table tbody tr');

        // Überprüfe, ob der aktive Button erneut geklickt wurde
        if (activeType === buildingType) {
            // Entferne den Filter
            rows.forEach(row => {
                row.style.display = ''; // Zeige die Zeile
            });

            // Setze den aktiven Typ auf null
            activeType = null;
        } else {
            // Filtere Gebäude nach Typ
            rows.forEach(row => {
                const imageSrc = row.querySelector('td img').getAttribute('src');
                if (imageSrc.includes('/images/' + buildingType + '.png')) {
                    row.style.display = ''; // Zeige die Zeile
                } else {
                    row.style.display = 'none'; // Verstecke die Zeile
                }
            });

            // Setze den aktiven Typ
            activeType = buildingType;
        }

        //console.log('Filtering buildings by type:', buildingType);

        // Setze den aktiven Button und entferne die Aktivklasse von anderen Buttons
        const buttons = document.querySelectorAll('.btn.btn-xs');
        buttons.forEach(button => {
            if (button === clickedButton) {
                button.classList.toggle('btn-success', activeType === buildingType);
            } else {
                button.classList.remove('btn-success');
            }
        });
    }
    // Warte 100 ms, bevor das Skript ausgeführt wird
    setTimeout(addFilterButtons, 100);
})();
