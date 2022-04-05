//import { query } from 'express'
import connect from './connect.js'

const animalCollection = connect().collection('animals')

export const getAllanimals = async () => {
    
    try{
        const snapshot = await animalCollection.get()
        const result = snapshot.docs.map( doc => {
            const animal = doc.data()
            animal.id = doc.id
            return animal
        })
        
        return result

    }
    catch(error){
        console.error(error)
    }
}

export const createAnimal = async (animal) => {

    try{
        const result = await animalCollection.add(animal)
        animal.id = result.id
        return animal
    }
    catch(error){
        console.error(error)
    }
}
export const updateAnimal = async (id, animal) => {
    try {
        const result = await animalCollection
    .doc(id)
    .update(animal)

    return await getAnimalById(id)
}   catch (error){
    console.log(error)
    }
}

export const getAnimalById = async id =>{
    try{
        const result = await animalCollection.doc(id).get()
        return {
            id: result.id,
            ...result.data()
        }

        } catch (error){
            console.error(error)
        }
    }

export const deleteAnimal = async id =>{
    try{
        const result = await animalCollection.doc(id).delete()
        return "Animal deleted"
            
    }catch (error){
        console.error(error)
    }
}    

export const getAnimalsByFilter = async animalFilter => {

    if(!animalFilter){
        animalFilter = {}
    }

    const { name, race, color, age } = animalFilter
    
    let query = animalCollection

    if(name){
        query = query.where("name", "==", name)
    }
    
    if(race){
        query = query.where("race", "==", race) 
    }

    if(color){
        query = query.where("color", "==", color)
    }

    if(age){
        query = query.where("age", "==", age)
    }
    try{
        const snapshot = await query.get()
        const result = snapshot.docs.map( doc =>{
        const animal = doc.data()
        animal.id = doc.id
        return animal

    })
    return result

    }catch (error) {
        console.error(error)
    }

}


