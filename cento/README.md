cento
=====

* To Do:
  * Make a Dogbone z-order registry
    * Instead of using global constants
    * Is a dictionary
      * Key: string
      * Value: z-order (Number)

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

* Unit Tests
  * PortConnect.autoConnect: 
    * Fully test 
      * Provide fully-stocked source and destination ActionViews

  * ActionView:
    * Test port-related functions
    