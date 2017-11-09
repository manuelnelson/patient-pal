const Roles = { Admin: 1, Professional: 2, Client: 10};
class Constants {};
Constants.roles = Roles;
Constants.defaultPassword = 'p@ssw0rd!';
Constants.reportTypes = {mastered: 'mastered', weakest: 'weakest', progress: 'progress'};
Constants.dateTypes = {
    dateFormat: 'MMMM do, YYYY',
    altDateFormat: 'MMMM DD, YYYY'
}
export default Constants;
