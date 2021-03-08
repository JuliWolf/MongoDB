/* ********************************************************* */
db.persons.aggregate([
	{ $match: { gender: "female" } },
	{ $group: { _id: {state: "$location.state"}, totalPersons: {$sum: 1} } }
]).pretty()

// Result
/* { "_id" : { "state" : "gümüşhane" }, "totalPersons" : 8 }
{ "_id" : { "state" : "loire-atlantique" }, "totalPersons" : 4 }
{ "_id" : { "state" : "muş" }, "totalPersons" : 6 }
{ "_id" : { "state" : "siirt" }, "totalPersons" : 6 }
{ "_id" : { "state" : "merseyside" }, "totalPersons" : 4 }
{ "_id" : { "state" : "nordjylland" }, "totalPersons" : 54 }
{ "_id" : { "state" : "hamburg" }, "totalPersons" : 24 }
{ "_id" : { "state" : "bahia" }, "totalPersons" : 8 }
{ "_id" : { "state" : "hovedstaden" }, "totalPersons" : 42 }
{ "_id" : { "state" : "new brunswick" }, "totalPersons" : 18 }
{ "_id" : { "state" : "limerick" }, "totalPersons" : 10 }
{ "_id" : { "state" : "south yorkshire" }, "totalPersons" : 6 }
{ "_id" : { "state" : "county antrim" }, "totalPersons" : 2 }
{ "_id" : { "state" : "خراسان رضوی" }, "totalPersons" : 20 }
{ "_id" : { "state" : "kayseri" }, "totalPersons" : 4 }
{ "_id" : { "state" : "haute-loire" }, "totalPersons" : 4 }
{ "_id" : { "state" : "گیلان" }, "totalPersons" : 20 }
{ "_id" : { "state" : "loire" }, "totalPersons" : 4 }
{ "_id" : { "state" : "kainuu" }, "totalPersons" : 22 }
{ "_id" : { "state" : "castilla y león" }, "totalPersons" : 24 } */



/* ********************************************************* */
// With Sorting
db.persons.aggregate([
	{ $match: { gender: "female" } },
	{ $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
	{ $sort: { totalPersons: -1 } }
]).pretty()

// Result
/* { "_id" : { "state" : "new south wales" }, "totalPersons" : 48 }
{ "_id" : { "state" : "syddanmark" }, "totalPersons" : 48 }
{ "_id" : { "state" : "south australia" }, "totalPersons" : 44 }
{ "_id" : { "state" : "hovedstaden" }, "totalPersons" : 42 }
{ "_id" : { "state" : "danmark" }, "totalPersons" : 42 }
{ "_id" : { "state" : "overijssel" }, "totalPersons" : 40 }
{ "_id" : { "state" : "queensland" }, "totalPersons" : 40 }
{ "_id" : { "state" : "sjælland" }, "totalPersons" : 38 }
{ "_id" : { "state" : "nova scotia" }, "totalPersons" : 34 }
{ "_id" : { "state" : "canterbury" }, "totalPersons" : 32 }
{ "_id" : { "state" : "northwest territories" }, "totalPersons" : 32 }
{ "_id" : { "state" : "gelderland" }, "totalPersons" : 32 }
{ "_id" : { "state" : "yukon" }, "totalPersons" : 32 }
{ "_id" : { "state" : "bayern" }, "totalPersons" : 30 }
{ "_id" : { "state" : "tasmania" }, "totalPersons" : 30 }
{ "_id" : { "state" : "northern territory" }, "totalPersons" : 30 }
{ "_id" : { "state" : "nunavut" }, "totalPersons" : 28 } */



/* ********************************************************* */
// Add new field
db.persons.aggregate([
	{
		$project: {
			_id: 0,
			gender: 1,
			fullName: {
				$concat: [
					{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
					{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
					" ",
					{ $toUpper: "$name.last" }
				]
			}
		}
	}
]).pretty()

// Result
/* 
{ "gender" : "male", "fullName" : "zachary lo" }
{ "gender" : "male", "fullName" : "harvey chambers" }
{ "gender" : "male", "fullName" : "carl jacobs" }
{ "gender" : "male", "fullName" : "gideon van drongelen" }
{ "gender" : "female", "fullName" : "پریا پارسا" }
{ "gender" : "female", "fullName" : "maeva wilson" }
{ "gender" : "female", "fullName" : "olav oehme" }
{ "gender" : "male", "fullName" : "elijah lewis" }
{ "gender" : "male", "fullName" : "victor pedersen" }
{ "gender" : "male", "fullName" : "isolino viana" }
{ "gender" : "female", "fullName" : "shona kemperman" }
{ "gender" : "female", "fullName" : "louise graham" }
{ "gender" : "female", "fullName" : "mestan kaplangı" }
{ "gender" : "female", "fullName" : "katie welch" }
{ "gender" : "female", "fullName" : "sandra lorenzo" }
{ "gender" : "male", "fullName" : "بنیامین سالاری" }
{ "gender" : "female", "fullName" : "andreia arnaud" }
{ "gender" : "female", "fullName" : "madeleine till" }
{ "gender" : "female", "fullName" : "anaëlle adam" }
{ "gender" : "female", "fullName" : "anne ruiz" }
 */


/* ********************************************************* */
db.persons.aggregate([{
		$project: {
			_id: 0, name: 1, email: 1, location: {
				type: "Point", coordinates: [
					{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0, onNull: 0 } },
					{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0, onNull: 0 } }] } } },
	{
		$project: {
			gender: 1,
			email: 1,
			location: 1,
			fullName: {
				$concat: [
					{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
					{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
					" ",
					{ $toUpper: "$name.last" }
				]
			}
		}
	}
]).pretty()



/* ********************************************************* */
db.persons.aggregate([{
	$project: {
		_id: 0,
		name: 1,
		email: 1,
		birthdate: { $convert: { input: "$dob.date", to: "date" } },
		age: "$dob.age",
		location: {
			type: "Point", coordinates: [
				{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0.0, onNull: 0.0 } },
				{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0.0, onNull: 0.0 } }] } } },
{
	$project: {
		gender: 1,
		email: 1,
		location: 1,
		birthdate: 1,
		age: 1,
		fullName: {
			$concat: [
				{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
				{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
				" ",
				{ $toUpper: "$name.last" }
			]
		}
	}
}
]).pretty()

// Result
/* {
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        78.0207,
                        -84.1572
                ]
        },
        "email" : "anne.ruiz@example.com",
        "birthdate" : ISODate("1982-10-09T12:10:42Z"),
        "age" : 35,
        "fullName" : "Anne RUIZ"
}
 */



/* ********************************************************* */
// Shortcut for convert
db.persons.aggregate([{
	$project: {
		_id: 0,
		name: 1,
		email: 1,
		birthdate: { $toDate: "$dob.date" },
		age: "$dob.age",
		location: {
			type: "Point", coordinates: [
				{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0, onNull: 0 } },
				{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0, onNull: 0 } }] } } },
{
	$project: {
		gender: 1,
		email: 1,
		location: 1,
		birthdate: 1,
		age: 1,
		fullName: {
			$concat: [
				{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
				{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
				" ",
				{ $toUpper: "$name.last" }
			]
		}
	}
}
]).pretty()



/* ********************************************************* */
// Grouping by year
db.persons.aggregate([{
	$project: {
		_id: 0,
		name: 1,
		email: 1,
		birthdate: { $toDate: "$dob.date" },
		age: "$dob.age",
		location: {
			type: "Point", coordinates: [
				{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0, onNull: 0 } },
				{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0, onNull: 0 } }] } } },
{
	$project: {
		gender: 1,
		email: 1,
		location: 1,
		birthdate: 1,
		age: 1,
		fullName: {
			$concat: [
				{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
				{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
				" ",
				{ $toUpper: "$name.last" }
			]
		}
	}
	},
	{
		$group: { _id: { birthYear: { $isoWeekYear: "$birthdate" } }, numPersons: {$sum: 1} }
	},
	{ $sort: {numPersons: -1}}
]).pretty()



/* ********************************************************* */
// Push
db.friends.aggregate([
	{$group: {_id: {age: "$age"}, allHobbies: {$push: "$hobbies"} } }
]).pretty()


// Result
/* 
{
        "_id" : {
                "age" : 30
        },
        "allHobbies" : [
                [
                        "Eating",
                        "Data Analytics"
                ]
        ]
}
{
        "_id" : {
                "age" : 29
        },
        "allHobbies" : [
                [
                        "Sports",
                        "Cooking"
                ],
                [
                        "Cooking",
                        "Skiing"
                ]
        ]
}
 */


// Unwind
db.friends.aggregate([
	{$unwind: "$hobbies"},
]).pretty()

// Result
/* 
{
        "_id" : ObjectId("60462457367b13a7e0ac9f1f"),
        "name" : "Max",
        "hobbies" : "Sports",
        "age" : 29,
        "examScores" : [
                {
                        "difficulty" : 4,
                        "score" : 57.9
                },
                {
                        "difficulty" : 6,
                        "score" : 62.1
                },
                {
                        "difficulty" : 3,
                        "score" : 88.5
                }
        ]
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f1f"),
        "name" : "Max",
        "hobbies" : "Cooking",
        "age" : 29,
        "examScores" : [
                {
                        "difficulty" : 4,
                        "score" : 57.9
                },
                {
                        "difficulty" : 6,
                        "score" : 62.1
                },
                {
                        "difficulty" : 3,
                        "score" : 88.5
                }
        ]
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f20"),
        "name" : "Manu",
        "hobbies" : "Eating",
        "age" : 30,
        "examScores" : [
                {
                        "difficulty" : 7,
                        "score" : 52.1
                },
                {
                        "difficulty" : 2,
                        "score" : 74.3
                },
                {
                        "difficulty" : 5,
                        "score" : 53.1
                }
        ]
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f20"),
        "name" : "Manu",
        "hobbies" : "Data Analytics",
        "age" : 30,
        "examScores" : [
                {
                        "difficulty" : 7,
                        "score" : 52.1
                },
                {
                        "difficulty" : 2,
                        "score" : 74.3
                },
                {
                        "difficulty" : 5,
                        "score" : 53.1
                }
        ]
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f21"),
        "name" : "Maria",
        "hobbies" : "Cooking",
        "age" : 29,
        "examScores" : [
                {
                        "difficulty" : 3,
                        "score" : 75.1
                },
                {
                        "difficulty" : 8,
                        "score" : 44.2
                },
                {
                        "difficulty" : 6,
                        "score" : 61.5
                }
        ]
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f21"),
        "name" : "Maria",
        "hobbies" : "Skiing",
        "age" : 29,
        "examScores" : [
                {
                        "difficulty" : 3,
                        "score" : 75.1
                },
                {
                        "difficulty" : 8,
                        "score" : 44.2
                },
                {
                        "difficulty" : 6,
                        "score" : 61.5
                }
        ]
}
 */


db.friends.aggregate([
	{$unwind: "$hobbies"},
	{$group: {_id: {age: "$age"}, allHobbies: {$push: "$hobbies"} } }
]).pretty()


// Result
/* 
{
        "_id" : {
                "age" : 29
        },
        "allHobbies" : [
                "Sports",
                "Cooking",
                "Cooking",
                "Skiing"
        ]
}
{
        "_id" : {
                "age" : 30
        },
        "allHobbies" : [
                "Eating",
                "Data Analytics"
        ]
}

*/

// To avoid dublicate
db.friends.aggregate([
	{$unwind: "$hobbies"},
	{$group: {_id: {age: "$age"}, allHobbies: {$addToSet: "$hobbies"} } }
]).pretty()

// Result
/* 
{
        "_id" : {
                "age" : 29
        },
        "allHobbies" : [
                "Skiing",
                "Sports",
                "Cooking"
        ]
}
{
        "_id" : {
                "age" : 30
        },
        "allHobbies" : [
                "Eating",
                "Data Analytics"
        ]
}

*/



/* ********************************************************* */
// Start at 2 and give 1
db.friends.aggregate([
	{ $project: { _id: 0, examScore: {$slice: ["$examScores", 2, 1] } } }
]).pretty()

// Result
/* 
{ "examScore" : [ { "difficulty" : 4, "score" : 57.9 } ] }
{ "examScore" : [ { "difficulty" : 7, "score" : 52.1 } ] }
{ "examScore" : [ { "difficulty" : 3, "score" : 75.1 } ] }
*/



/* ********************************************************* */
db.friends.aggregate([
	{ $project: { _id: 0, numScores: {$size: "$examScores"} } }
]).pretty()

// Result
/* 
{ "numScores" : 3 }
{ "numScores" : 3 }
{ "numScores" : 3 }
*/



/* ********************************************************* */
// Filter documents fields examScores > 60
db.friends.aggregate([
	{
		$project: {
			_id: 0,
			examScores: {
				$filter: {
					input: "$examScores",
					as: "sc",
					cond: { $gt: ["$$sc.score", 60] }
				}
			}
		}
	}
]).pretty()

// Result
/* 
{
        "examScores" : [
                {
                        "difficulty" : 6,
                        "score" : 62.1
                },
                {
                        "difficulty" : 3,
                        "score" : 88.5
                }
        ]
}
{ "examScores" : [ { "difficulty" : 2, "score" : 74.3 } ] }
{
        "examScores" : [
                {
                        "difficulty" : 3,
                        "score" : 75.1
                },
                {
                        "difficulty" : 6,
                        "score" : 61.5
                }
        ]
}
*/



/* ********************************************************* */
// Show only hiest examScores
db.friends.aggregate([
	{ $unwind: "$examScores" },
	{ $project: {_id: 1, name: 1, age: 1, score: "$examScores.score"}},
	{ $sort: { score: -1 } },
	{ $group: { _id: "$_id", maxScore: { $max: "$score" }, name: { $first: "$name" } } },
	{ $sort: { maxScore: -1 } }
]).pretty()

// Result
/* 
{
        "_id" : ObjectId("60462457367b13a7e0ac9f1f"),
        "maxScore" : 88.5,
        "name" : "Max"
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f21"),
        "maxScore" : 75.1,
        "name" : "Maria"
}
{
        "_id" : ObjectId("60462457367b13a7e0ac9f20"),
        "maxScore" : 74.3,
        "name" : "Manu"
}
*/



/* ********************************************************* */
// Aggregate by categories
db.persons.aggregate([
	{
		$bucket: {
			groupBy: "$dob.age",
			boundaries: [0, 18, 30, 40, 50, 80, 120],
			output: {
				numPersons: {$sum: 1},
				averageAge: {$avg: "$dob.age"},
			}
		}
	}
]).pretty()

// Result
/*
{ "_id" : 18, "numPersons" : 1736, "averageAge" : 25.101382488479263 }
{ "_id" : 30, "numPersons" : 1820, "averageAge" : 34.51758241758242 }
{ "_id" : 40, "numPersons" : 1836, "averageAge" : 44.42265795206972 }
{ "_id" : 50, "numPersons" : 4608, "averageAge" : 61.46440972222222 }
 */


db.persons.aggregate([
	{
		$bucketAuto: {
			groupBy: "$dob.age",
			buckets: 5,
			output: {
				numPersons: {$sum: 1},
				averageAge: {$avg: "$dob.age"},
			}
		}
	}
]).pretty()

// Result
/* 
{
        "_id" : {
                "min" : 21,
                "max" : 32
        },
        "numPersons" : 2084,
        "averageAge" : 25.99616122840691
}
{
        "_id" : {
                "min" : 32,
                "max" : 43
        },
        "numPersons" : 2020,
        "averageAge" : 36.97722772277228
}
{
        "_id" : {
                "min" : 43,
                "max" : 54
        },
        "numPersons" : 2066,
        "averageAge" : 47.98838334946757
}
{
        "_id" : {
                "min" : 54,
                "max" : 65
        },
        "numPersons" : 2128,
        "averageAge" : 58.99342105263158
}
{
        "_id" : {
                "min" : 65,
                "max" : 74
        },
        "numPersons" : 1702,
        "averageAge" : 69.11515863689776
}
*/



/* ********************************************************* */
// Find 10 persons with the lowest birthDate and get 10
db.persons.aggregate([
	{ $project: { _id: 0, name: 1, birthdate: { $toDate: "$dob.date" } } },
	{ $sort: { birthdate: 1 } },
	{ $limit: 10 }
]).pretty()



/* ********************************************************* */
// Work with geoData - geoNear have to be first
db.transformedPersons.aggregate([
	{
		$geoNear: {
			near: { type: "Point", coordinates: [-18.4, -42.8] },
			maxDistance: 60000000,
			query: { age: {$gt: 30} },
			distanceField: "distance"
		}
	},
]).pretty()