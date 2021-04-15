import { db } from './firebase.js'

export async function getVolunteers() {
    return db.collection("volunteers").get().then((querySnapshot) => {
        let volunteerData = {}

        querySnapshot.forEach((doc) => {

            volunteerData[doc.id] = {}
            volunteerData[doc.id]['data'] = doc.data()
            volunteerData[doc.id]['experience'] = []

            db.collection("volunteers").doc(doc.id).collection('experience').get().then((snapshot) => {
                snapshot.forEach((experiences) => {
                    volunteerData[doc.id]['experience'].push(experiences.data())
                })
            })
        });

        return volunteerData;
    });

    return volunteerData
}

export async function getOrganizations() {

    return db.collection('organizations').get().then((querySnapshot) => {
        let organizationData = {}

        querySnapshot.forEach((doc) => {

            organizationData[doc.id] = {}
            organizationData[doc.id]['data'] = doc.data()
            organizationData[doc.id]['opportunities'] = []

            db.collection("organizations").doc(doc.id).collection('opportunities').get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    organizationData[doc.id]['opportunities'].push(opportunities.data())
                })
            })
        })

        return organizationData;
    })

    return organizationData
}

export async function getSchools() {

    return db.collection('schools').get().then((querySnapshot) => {
        let schoolData = {}

        querySnapshot.forEach((doc) => {
            schoolData[doc.id] = {}
            schoolData[doc.id]['data'] = doc.data()
            schoolData[doc.id]['opportunities'] = []

            db.collection("schools").doc(doc.id).collection('opportunities').get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    schoolData[doc.id]['opportunities'].push(opportunities.data())
                })
            })
        })

        return schoolData;
    })

    return schoolData
}

export async function queryOpportunities(query) {
    return db.collection('organizations').get().then((querySnapshot) => {
        let list = {}

        querySnapshot.forEach((doc) => {
            db.collection("organizations").doc(doc.id).collection('opportunities').where("tags", "array-contains", query).get().then((snapshot) => {
                snapshot.forEach((opportunities) => {
                    list[doc.id] = {}
                    list[doc.id]['data'] = doc.data()
                    list[doc.id]['opportunities'] = opportunities.data()
                })
            })
        })

        return list;
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