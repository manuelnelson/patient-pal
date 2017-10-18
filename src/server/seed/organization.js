import { Organization, Professional } from '../models';


function noEmail() {    
    return Organization.find({email: {$exists: false}});
}

function update(organization) {
    return Professional.findOne({organization: organization._id})
    .exec()
    .then(professional => {
        console.log('tet')
        console.log(professional)
        if(professional){
            organization.email = professional.email;
            return organization.save().then(savedOrganization => savedOrganization);
        }
        else{
            return organization.remove().then(x=>x);
        }
    })
    .catch(e => console.log(e))
}

function run(organizations){
    let promiseArray = [];
    console.log(organizations);
    if(organizations.length != 0){
        Promise.all(
            organizations
                .map(organization => update(organization))
        ).then(()=> console.log('Stripe Information Added'))
    }
}

export default {noEmail, run}
