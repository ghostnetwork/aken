dogbone
=======

To Fix:
  * Dogbone:
    * Selection with negative width or height, doesn't select children as mouse moves over them
    
To Do:
  * When setting Dogbone main view's backgroundColor, you also need to set its highlightBgColor
    * Otherwise the backgroundColor gets changed to whatever the highlightBgColor is
      * Which is set in configureMainView()
