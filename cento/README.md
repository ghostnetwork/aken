cento
=====

To Do:
  * Program:
    * Program : Action
      * Contains: ProgramStart, ProgramEnd
      * Will need to provide means of traversing the program
        * Begin at ProgramStart, following segments to ProgramEnd
    
    * Program views:
      * ProgramView : ActionView
      * ProgramStartView : ActionView
      * ProgramEndView : ActionView

  * SegmentView:
    * Needs to have its zOrder be less than that of the View's (so the lines are drawn below the view)
