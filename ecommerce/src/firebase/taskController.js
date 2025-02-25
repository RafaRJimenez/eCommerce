import { db } from './index'
import { collection, addDoc, getDocs, query } from 'firebase/firestore'

export const addNewTask = async task => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), task);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    })
    console.log("tasks", tasks);
    return tasks;
}
