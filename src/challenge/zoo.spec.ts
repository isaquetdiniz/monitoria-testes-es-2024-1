import { faker } from '@faker-js/faker'
import { Zoo, Animal } from './zoo'

describe('Zoo', () => {
	let zoo: Zoo

	beforeEach(() => {
		zoo = new Zoo()
	})

	test('should add a new animal', () => {
		const animal = new Animal('Leo', 'Lion', 5)
		zoo.addAnimal(animal)
		expect(zoo.getAllAnimals()).toContainEqual(animal)
	})

	describe('removeAnimal', () => {
		it('should remove an animal', () => {
			const animal = createAnimal({})

			zoo.addAnimal(animal)

			zoo.removeAnimal(animal.name)

			expect(zoo.getAllAnimals()).toHaveLength(0)
		})

		it('should not remove an animal if not found', () => {
			const animal = createAnimal({})

			zoo.addAnimal(animal)

			const animalName = faker.string.alpha(10)
			zoo.removeAnimal(animalName)

			expect(zoo.getAllAnimals()).toHaveLength(1)
		})
	})

	describe('getAnimal', () => {
		it('should get an animal', () => {
			const animal = createAnimal({})

			zoo.addAnimal(animal)

			const result = zoo.getAnimal(animal.name)

			expect(result).toBe(animal)
		})

		it('should return undefined if animal not found', () => {
			const animal = createAnimal({})

			zoo.addAnimal(animal)

			const animalName = faker.string.alpha(10)
			const result = zoo.removeAnimal(animalName)

			expect(result).toBeUndefined()
		})
	})

	describe('getAllAnimals', () => {
		it('should get alls animals', () => {
			const totalAnimals = faker.number.int({ min: 0, max: 100 })
			const animals = Array.from({ length: totalAnimals }, () => createAnimal({}))

			animals.forEach((animal) => zoo.addAnimal(animal))

			const result = zoo.getAllAnimals()

			expect(result).toHaveLength(totalAnimals)
			expect(result).toStrictEqual(animals)
		})
	})

	describe('getAnimalsBySpecies', () => {
		it('should get alls animals by specie', () => {
			const totalAnimalsFromOtherSpecie = faker.number.int({ min: 0, max: 100 })
			const totalAnimalsFromSpecie = faker.number.int({ min: 0, max: 100 })
			const specie = faker.animal.type()
			const otherSpecie = faker.animal.type()

			const specieAnimals = Array.from({ length: totalAnimalsFromSpecie }, () =>
				createAnimal({ species: specie })
			)
			const otherAnimals = Array.from({ length: totalAnimalsFromOtherSpecie }, () =>
				createAnimal({ species: otherSpecie })
			)

			const animals = [...specieAnimals, ...otherAnimals]

			animals.forEach((animal) => zoo.addAnimal(animal))

			const result = zoo.getAnimalsBySpecies(specie)

			expect(result).toHaveLength(totalAnimalsFromSpecie)
			expect(result).toStrictEqual(specieAnimals)
		})
	})

	describe('getAverageAge', () => {
		it('should return 0 if zoo not has animals', () => {
			const result = zoo.getAverageAge()

			expect(result).toBe(0)
		})

		it('should return a average of zoo animals age', () => {
			const totalAnimals = faker.number.int({ min: 1, max: 100 })

			const animals = Array.from({ length: totalAnimals }, () => createAnimal({}))

			const animalsAverageAge =
				animals.reduce((sum, animal) => sum + animal.age, 0) / animals.length

			animals.forEach((animal) => zoo.addAnimal(animal))

			const result = zoo.getAverageAge()

			expect(result).toBe(animalsAverageAge)
		})
	})
})

const createAnimal = (params: CreateAnimalParams): Animal => {
	return new Animal(
		params.name ?? faker.person.firstName(),
		params.species ?? faker.animal.type(),
		params.age ?? faker.number.int({ min: 1, max: 250 })
	)
}

type CreateAnimalParams = {
	name?: string
	species?: string
	age?: number
}
