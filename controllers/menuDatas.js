const animalKinds = [
	{ type: 'cat', translate: 'Кошки' },
	{ type: 'dog', translate: 'Собаки' },
	{ type: 'parrot', translate: 'Попугаи' },
	{ type: 'hamster', translate: 'Хомяки' },
	{ type: 'mouse', translate: 'Мыши / крысы' },
	{ type: 'hare', translate: 'Зайцы / кролики' },
	{ type: 'guineapig', translate: 'Морские свинки' },
	{ type: 'champ', translate: 'Хорьки' },
	{ type: 'snak', translate: 'Змеи' },
	{ type: 'iguana', translate: 'Игуаны' },
	{ type: 'turtle', translate: 'Черепахи' },
	{ type: 'snail', translate: 'Улитки' },
	{ type: 'fish', translate: 'Рыбки' },
	{ type: 'insects', translate: 'Насекомые' },
	{ type: 'horse', translate: 'Лошади' },
	{ type: 'cow', translate: 'Коровы / быки' },
	{ type: 'pig', translate: 'Свиньи' },
	{ type: 'goat', translate: 'Козы' },
	{ type: 'sheep', translate: 'Овцы' },
	{ type: 'domesticbird', translate: 'Домашняя птица' },
	{ type: 'other', translate: 'Другие' }
]

const typesList = [
	{ type: 'buy', translate: 'Купить', count: 0 },
	{ type: 'find', translate: 'Находка', count: 0 },
	{ type: 'missing', translate: 'Пропажа', count: 0 },
	{ type: 'gift', translate: 'Даром', count: 0 },
]

const menuData = [
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FcatMenu.jpg?alt=media&token=283aae65-4450-4ae4-b41d-46da0e35a24b',
		title: animalKinds[0].translate,
		type: animalKinds[0].type,
		categoryNames: {
			myLinks: ['/animals/cat/buy', '/animals/cat/find', '/animals/cat/missing', '/animals/cat/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e123r2e3', '2f3f32', 'f4f34', '4r4f34']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FdogMenu.jpg?alt=media&token=61db6dd0-933d-4050-be3f-631038d95c0e',
		title: animalKinds[1].translate,
		type: animalKinds[1].type,
		categoryNames: {
			myLinks: ['/animals/dog/buy', '/animals/dog/find', '/animals/dog/missing', '/animals/dog/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e123e3', '2f3ewf2', 'f434f', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fparrot.jpg?alt=media&token=a9042563-7b2e-4744-9741-79204e25af64',
		title: animalKinds[2].translate,
		type: animalKinds[2].type,
		categoryNames: {
			myLinks: ['/animals/parrot/buy', '/animals/parrot/find', '/animals/parrot/missing', '/animals/parrot/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhamster.jpg?alt=media&token=2bb626a5-41a1-4998-93a9-9875481fb40f',
		title: animalKinds[3].translate,
		type: animalKinds[3].type,
		categoryNames: {
			myLinks: ['/animals/hamster/buy', '/animals/hamster/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fmouse.jpg?alt=media&token=15e5b1c7-7ba5-4044-aa62-d9d120a2a079',
		title: animalKinds[4].translate,
		type: animalKinds[4].type,
		categoryNames: {
			myLinks: ['/animals/mouse/buy', '/animals/mouse/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhare.jpg?alt=media&token=f8f5156b-a298-4e7b-afc7-b13b14265132',
		title: animalKinds[5].translate,
		type: animalKinds[5].type,
		categoryNames: {
			myLinks: ['/animals/hare/buy', '/animals/hare/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fguineapig.jpg?alt=media&token=9a932a7a-20d2-47ba-b22f-30f25b412c19',
		title: animalKinds[6].translate,
		type: animalKinds[6].type,
		categoryNames: {
			myLinks: ['/animals/guineapig/buy', '/animals/guineapig/find', '/animals/guineapig/missing', '/animals/guineapig/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fchamp.jpg?alt=media&token=c8890970-fd64-4c27-9bd2-8a830c0e81e3',
		title: animalKinds[7].translate,
		type: animalKinds[7].type,
		categoryNames: {
			myLinks: ['/animals/champ/buy', '/animals/champ/find', '/animals/champ/missing', '/animals/champ/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsnak.jpg?alt=media&token=384d3814-2c4d-4f46-b1d7-0a6cfa39b15d',
		title: animalKinds[8].translate,
		type: animalKinds[8].type,
		categoryNames: {
			myLinks: ['/animals/snak/buy', '/animals/snak/find', '/animals/snak/missing', '/animals/snak/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Figuana.jpg?alt=media&token=37124f1d-10eb-48ac-815b-d3464403af50',
		title: animalKinds[9].translate,
		type: animalKinds[9].type,
		categoryNames: {
			myLinks: ['/animals/iguana/buy', '/animals/iguana/find', '/animals/iguana/missing', '/animals/iguana/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fturtle.jpg?alt=media&token=9aff78ad-9093-4d31-ac25-40f959688521',
		title: animalKinds[10].translate,
		type: animalKinds[10].type,
		categoryNames: {
			myLinks: ['/animals/turtle/buy', '/animals/turtle/find', '/animals/turtle/missing', '/animals/turtle/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsnail.jpg?alt=media&token=4f010780-da2b-4ce0-92f7-3147e5086c46',
		title: animalKinds[11].translate,
		type: animalKinds[11].type,
		categoryNames: {
			myLinks: ['/animals/snail/buy', '/animals/snail/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Ffish.jpg?alt=media&token=7f70e25d-0b99-49fd-8221-949d77ac1147',
		title: animalKinds[12].translate,
		type: animalKinds[12].type,
		categoryNames: {
			myLinks: ['/animals/fish/buy', '/animals/fish/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Finsects.jpg?alt=media&token=08555cd0-d6ec-4877-85f0-ae9ed47602d9',
		title: animalKinds[13].translate,
		type: animalKinds[13].type,
		categoryNames: {
			myLinks: ['/animals/insects/buy', '/animals/insects/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhorse.jpg?alt=media&token=639589a1-86e1-48c4-8e0e-c9b37af5b18a',
		title: animalKinds[14].translate,
		type: animalKinds[14].type,
		categoryNames: {
			myLinks: ['/animals/horse/buy', '/animals/horse/find', '/animals/horse/missing', '/animals/horse/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fcow.jpg?alt=media&token=713eca65-2a74-4d73-8b26-4a0628111245',
		title: animalKinds[15].translate,
		type: animalKinds[15].type,
		categoryNames: {
			myLinks: ['/animals/cow/buy', '/animals/cow/find', '/animals/cow/missing', '/animals/cow/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fpig.jpg?alt=media&token=8aa8d17a-d9f9-4fb4-8baf-a20682406757',
		title: animalKinds[16].translate,
		type: animalKinds[16].type,
		categoryNames: {
			myLinks: ['/animals/pig/buy', '/animals/pig/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fgoat.jpg?alt=media&token=032e4074-0e53-416e-930a-a53d89cbac7e',
		title: animalKinds[17].translate,
		type: animalKinds[17].type,
		categoryNames: {
			myLinks: ['/animals/goat/buy', '/animals/goat/find', '/animals/goat/missing', '/animals/goat/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsheep.jpg?alt=media&token=2c2af997-46b4-4919-b15c-2bf7d6e462f5',
		title: animalKinds[18].translate,
		type: animalKinds[18].type,
		categoryNames: {
			myLinks: ['/animals/sheep/buy', '/animals/sheep/find', '/animals/sheep/missing', '/animals/sheep/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fdomesticbird.jpg?alt=media&token=94cbd183-326c-4b38-a251-8d159c011631',
		title: animalKinds[19].translate,
		type: animalKinds[19].type,
		categoryNames: {
			myLinks: ['/animals/domesticbird/buy', '/animals/domesticbird/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fother.png?alt=media&token=1d8fe29a-2fa3-418f-8e8d-1cc1a1a1901d',
		title: animalKinds[20].translate,
		type: animalKinds[20].type,
		categoryNames: {
			myLinks: ['/animals/other/buy', '/animals/other/find', '/animals/other/missing', '/animals/other/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1gref322e3', '2ff3re3f2', 'f4354334', '4rf32gt434', '4r434gtr42']
		}
	}
]

exports.animalKinds = animalKinds
exports.menuData = menuData
