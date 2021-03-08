// To controll type of number
-- db.persons.insertOne({age: NumberInt(29) })

// Big Int
-- db.companies.insertOne({valuation: NumberLong(5000000000)})

// Try to insert the biggest int64
-- db.companies.insertOne({ valuation: NumberLong(9223372036854775807) }) // error
-- db.companies.insertOne({ valuation: NumberLong("9223372036854775807") })

// Maths operations works only with numbers
-- db.companies.updateOne({}, { $inc: {valuation: NumberLong("1")}})


