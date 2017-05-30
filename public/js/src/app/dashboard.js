/** DASHBOARD **/
// Functions related to dashboard options

// VARS
var $dashboard = $('#dashboard' ),
	$toDashboard = $('#to-dashboard');

// LOGIC
$(function() {

	if (isSpeaker()) {

		makeDashboardDraggable();
		showHideDashboard();
		showSectionOnTitleClick();
	}

});

// FUNCTIONS
function makeDashboardDraggable() {

	$dashboard.drags();
}

function showHideDashboard() {

	$toDashboard.on('click', function() {
		if ($dashboard.hasClass('active')) {
			$dashboard.removeClass('active');
		} else {
			$dashboard.addClass('active');
		}
	});

}

function showSectionOnTitleClick() {

	$dashboard.find('.section-title').on('click', function() {
		$(this).next('.section-body').slideToggle();
	});

}