import { db } from './index'
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc, query } from 'firebase/firestore'

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


export const updateTask = async (id, task) => {
    try {
        await setDoc(doc(db, "tasks", id), task);
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}


export const deleteTask = async id => {
    try {
        await deleteDoc(doc(db, "tasks", id));
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}