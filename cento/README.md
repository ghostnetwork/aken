cento
=====

* To Do:
  * Need a way to remove connections
    * PortConnect should handle this

  * Last view should auto-connect to EndProgramView
    * Relies on ability to remove connection
    * Draw dashed line to EndProgramView?
  
  * Repair connections after deleting items
    * Need to auto-connect views that were on either side of deleted item

  * Sequence
    * Sequence object
    * Sequence action object
    * Creation process:
      * Rubberband to select views
      * Press action object to invoke
    * Sequence view object:
      * Contains views that were selected
      * Has input & output ports
        * Input port connects to left view
        * Output port connects to right view
      * Auto-connect its ports to nearby views
      
* To Fix:
  * Newly minted view objects should be placed to the right of the rightmost item
  

