var redis = require("redis"),
    client = redis.createClient();

//写入JavaScript(JSON)对象
client.hmset('sessionid', { username: 'kris', password: 'password' }, function(err) {
  console.log(err)
})

//读取JavaScript(JSON)对象
client.hgetall('sessionid', function(err, object) {
  console.log(object)
})