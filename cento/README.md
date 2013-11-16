cento
=====

To Do:
  * Action
    * Link actions together to form a sequence, which a Program can invoke

    * perform()
      * Invokes the action
      * Is different from worker
        * worker is for running native code
        * perform() runs cento code

  * Program:
    * Program : Action
      * Contains: ProgramStart, ProgramEnd
      * Will need to provide means of traversing the program
        * Begin at ProgramStart, following segments to ProgramEnd
    
    * Program views:
      * ProgramView : ActionView
      * ProgramStartView : ActionView
      * ProgramEndView : ActionView

* Fix:
  * ActionView
    * Newly added ActionViews should appear to the right of the last action

  * SegmentView
    * Draw segment lines below PortView
      * Needs to have its zOrder be less than that of the View's (so the lines are drawn below the view)

  * PortConnectSpec
    *
