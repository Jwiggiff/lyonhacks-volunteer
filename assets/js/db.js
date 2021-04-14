import { db } from './firebase.js'

export function getVolunteers() {
    let volunteerData = {}

    db.collection("Volunteer").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            volunteerData[doc.id] = {}
            volunteerData[doc.id]['data'] = doc.data()
            volunteerData[doc.id]['experience'] = []

            db.collection("Volunteer").doc(doc.id).collection('experience').get().then((snapshot) => {
                snapshot.forEach((experiences) => {
                    volunteerData[doc.id]['experience'].push(experiences.data())
                    console.log(volunteerData)
                })
            })
        });
    });

    return volunteerData
}

export function getOrganizations() {
    let organizationData = {}

    db.collection('Organization').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            organizationData[doc.id] = {}
            organizationData[doc.id]['data'] = doc.data()
            organizationData[doc.id]['opportunities'] = []

            db.collection("Organization").doc(doc.id).collection('opportunity').get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    organizationData[doc.id]['opportunities'].push(opportunities.data())
                    console.log(organizationData)
                })
            })
        })
    })

    return organizationData
}

export function getSchools() {
    let schoolData = {}

    db.collection('School').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            schoolData[doc.id] = {}
            schoolData[doc.id]['data'] = doc.data()
            schoolData[doc.id]['opportunities'] = []

            db.collection("School").doc(doc.id).collection('opportunity').get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    schoolData[doc.id]['opportunities'].push(opportunities.data())
                    console.log(schoolData)
                })
            })
        })
    })

    return schoolData
}

export function queryOpportunities(query) {
    let list = {}
    db.collection('Organization').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("Organization").doc(doc.id).collection('opportunity').where("tags", "array-contains", query).get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    list[doc.id] = {}
                    list[doc.id]['data'] = doc.data()
                    list[doc.id]['opportunities'] = opportunities.data()
                })
            })
        })
    })

    db.collection('School').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("School").doc(doc.id).collection('opportunity').where("tags", "array-contains", query).get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    list[doc.id] = {}
                    list[doc.id]['data'] = doc.data()
                    list[doc.id]['opportunities'] = opportunities.data()
                })
            })
        })
    })

    return list
}


