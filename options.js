function RestoreSettings() {
    $('#cookie_sql_query_threshhold').val(localStorage.cookie_sql_query_threshhold);
    $('#cookie_sql_exec_threshhold').val(localStorage.cookie_sql_exec_threshhold);
    $('#cookie_flow_control_threshhold').val(localStorage.cookie_flow_control_threshhold);
    $('#cookie_flow_node_threshhold').val(localStorage.cookie_flow_node_threshhold);
    $('input[name=cookie_php_request_on]').get(1 == localStorage.cookie_php_request_on ? 0:1).checked = true;
    $('input[name=cookie_sql_callstack_on]').get(1 == localStorage.cookie_sql_callstack_on ? 0:1).checked = true;
    $('input[name=cookie_flow_callstack_on]').get(1 == localStorage.cookie_flow_callstack_on ? 0:1).checked = true;
}

function SaveSettings() {
    var cookie_sql_query_threshhold = $('#cookie_sql_query_threshhold').val();
    var cookie_sql_exec_threshhold = $('#cookie_sql_exec_threshhold').val();
    var cookie_sql_callstack_on = $('input:checked[name=cookie_sql_callstack_on]').val();
    var cookie_flow_control_threshhold = $('#cookie_flow_control_threshhold').val();
    var cookie_flow_node_threshhold = $('#cookie_flow_node_threshhold').val();
    var cookie_flow_callstack_on = $('input:checked[name=cookie_flow_callstack_on]').val();
    var cookie_php_request_on = $('input:checked[name=cookie_php_request_on]').val();

    cookie_sql_query_threshhold = parseInt(cookie_sql_query_threshhold);
    if (!is_int(cookie_sql_query_threshhold) || cookie_sql_query_threshhold<0) {
        alert('SQL query threshhold is invalid !');
        return false;
    }
    cookie_sql_exec_threshhold = parseInt(cookie_sql_exec_threshhold);
    if (!is_int(cookie_sql_exec_threshhold) || cookie_sql_exec_threshhold<0) {
        alert('SQL execute threshhold is invalid !');
        return false;
    }
    cookie_flow_control_threshhold = parseInt(cookie_flow_control_threshhold);
    if (!is_int(cookie_flow_control_threshhold) || cookie_flow_control_threshhold<0) {
        alert('Flow control threshhold is invalid !');
        return false;
    }
    cookie_flow_node_threshhold = parseInt(cookie_flow_node_threshhold);
    if (!is_int(cookie_flow_node_threshhold) || cookie_flow_node_threshhold<0) {
        alert('Flow node threshhold is invalid !');
        return false;
    }

    localStorage.clear();
    localStorage.cookie_sql_query_threshhold = cookie_sql_query_threshhold;
    localStorage.cookie_sql_exec_threshhold = cookie_sql_exec_threshhold;
    localStorage.cookie_flow_control_threshhold = cookie_flow_control_threshhold;
    localStorage.cookie_flow_node_threshhold = cookie_flow_node_threshhold;
    localStorage.cookie_php_request_on = cookie_php_request_on;
    localStorage.cookie_sql_callstack_on = cookie_sql_callstack_on;
    localStorage.cookie_flow_callstack_on = cookie_flow_callstack_on;

    $(".notice").html('Settings saved.');
    $(".notice").center(true).css({
        top:'30px'
    });
    $(".notice").fadeIn('slow').delay(1000).fadeOut('slow');
}

function is_int(mixed_var) {
    return mixed_var === ~~mixed_var;
}

document.addEventListener('DOMContentLoaded', function () {
    RestoreSettings();
    document.getElementById('btnSaveSettings').addEventListener('click', SaveSettings);
});
