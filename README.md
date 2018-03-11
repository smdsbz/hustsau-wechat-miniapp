# hustsau-wechat-miniapp
WeChat miniapp repository


## Light-Bulbs

### TODO List

**Til. 2018 Summer:**  
- [ ] 招新页面
- [ ] 社联简介

**Another Day**  
- [ ] 物资模块迁移：要求后台完成 RESTful 转移

### Possible Structure
*Voting should be done before 2018.3.17*

- [ ] Full-Stack JavaScript, back-end using Node.js / express.js etc.
- [ ] Front-end use JS and WeChat stuff, back-end stick with
      Python + a handy RESTful package

--------------------------------------------------------------------------------

## Time Table

| Due Time   | Todo                                              |  Done Time |
|:---------- |:------------------------------------------------- | ----------:|
| 2018.03.17 | Project abstract design                           |            |
| 2018.03.30 | Finish front-end and user logic                   |            |
| 2018.05.07 | Finish 1-st stage development                     |            |

--------------------------------------------------------------------------------

## Authors

- [smdsbz](https://github.com/smdsbz)


## Licence and Citing

Works here are done by undergrads at SicunStudio, HUST-SAU. If you happen to
find security bugs / performance laggings in this implementation, it would be
very kind of you to inform the original authors (his / her name should be in
the nearest comment line).

--------------------------------------------------------------------------------

## Coding Styles
*(Move this to a dedicated `.md` if previous sections grow)*

- Use **2 spaces** for all (JavaScript / JSON / WXML / WXSS) indentations
- Your name, i.e. GitHub ID, before actual comment contents `// smdsbz: like this`
- Others, refer to PEP-8 :green_heart:

**Example**
```js
// Class Foo
var Foo = {

  name: "Foo",
  _hidden_name: "hidden",

  /**
   * Prints out numerous `bar`s
   *
   * :author: smdsbz@GitHub.com
   *
   * :param: bar    The string to display.
   *                It's ment to be displayed multiple times.
   * :return:       Nothing
   */
  printBars: function (bar) {       // camelCaseNaming in js
    for (let times = bar.length;
          times > 0; --times) {     // smdsbz: 4 more spaces than next
                                    //         indentation level
      console.log("First display: " + bar + ";"
                  + "Second display: " + bar);
    }
  }

};
```
