import CommandObject from "./CommandObject";

export default class ChangeBorderColorCommandObject extends CommandObject {
  constructor({
    registerExecution,
    selectedObj,
    executeCommand,
    executeUndo,
    executeRedo,
    newValue,
    oldValue,
    shapeId,
  }) {
    super({ registerExecution }, selectedObj, true, newValue, oldValue);
    this.executeCommand = executeCommand;
    this.executeUndo = executeUndo;
    this.executeRedo = executeRedo;
    this.shapeId = shapeId;
  }



  /* override to execute the action of this command.
   * pass in false for addToUndoStack if this is a command which is NOT
   * put on the undo stack, like Copy, or a change of selection or Save
   */
  execute() {
    this.executeCommand(this.shapeId, this.oldValue, this.newValue);

    // Note that this command object must be a NEW command object so it can be
    // registered to put it onto the stack
    if (this.addToUndoStack) this.undoHandler.registerExecution(this);
  }

  /* override to undo the operation of this command
   */
  undo() {
    this.executeUndo(this.shapeId, this.oldValue, this.newValue);
  }

  /* override to redo the operation of this command, which means to
   * undo the undo. This should ONLY be called if the immediate
   * previous operation was an Undo of this command. Anything that
   * can be undone can be redone, so there is no need for a canRedo.
   */
  redo() {
    this.executeRedo(this.shapeId, this.oldValue, this.newValue);
  }

  /* override to execute the operation again, this time possibly on
   * a new object. Thus, this typically uses the same value but a new
   * selectedObject.
   */
  repeat() {
  }
}
