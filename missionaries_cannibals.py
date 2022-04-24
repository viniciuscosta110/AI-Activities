 #cannibals and missionaries

class state:
    def __init__(self, missionaries_left, cannibals_left, missionaries_right, cannibals_right, side):
        self.missionaries_left = missionaries_left
        self.cannibals_left = cannibals_left
        self.missionaries_right = missionaries_right
        self.cannibals_right = cannibals_right
        self.side = side
        self.parent = None
        self.child = []
    
    def print_self(self):
        print("missionaries: ", self.missionaries_left, self.missionaries_right, "cannibals: ", self.cannibals_left, self.cannibals_right, "side: ", self.side)

    def is_solution(self):
        if self.missionaries_right == 3 and self.cannibals_right == 3 and self.missionaries_left == 0 and self.cannibals_left == 0:
            return True
        else:
            return False

    def state_is_valid(self):
                
        if (self.missionaries_right < 0 or self.cannibals_right  < 0 or
            self.missionaries_right > 3 or self.cannibals_right > 3 or
            self.missionaries_left < 0 or self.cannibals_left < 0 or
            self.missionaries_left > 3 or self.cannibals_left > 3):
            return False

        if ((self.missionaries_left == 0 or self.missionaries_left >= self.cannibals_left) and (self.missionaries_right == 0 or self.missionaries_right >= self.cannibals_right)):
            return True
        else:
            return False

    def add_child(self):
        moves = [[1, 0], [2, 0], [0, 1], [0, 2], [1, 1]]
        side = 0

        if self.side == 0:
            side = 1
        elif self.side == 1:
            side = 0
        
        for move in moves:
            
            missionaries_left = self.missionaries_left
            cannibals_left = self.cannibals_left
            missionaries_right = self.missionaries_right
            cannibals_right = self.cannibals_right

            if(side == 1):
                missionaries_right += move[0]
                missionaries_left -= move[0]
                
                cannibals_right += move[1]
                cannibals_left -= move[1]
            else:
                missionaries_right -= move[0]
                missionaries_left += move[0]
                
                cannibals_right -= move[1]
                cannibals_left += move[1]
               
            new_state = state(missionaries_left, cannibals_left, missionaries_right, cannibals_right, side)
            new_state.parent = self
            
            if(new_state.state_is_valid()):
                self.child.append(new_state)
            
class solution:
    def __init__(self):
        self.first_state = state(3,3,0,0,0)
        self.states = []
        self.path = []

        self.states.append(self.first_state)

    def test_solution(self):
        for stat in self.states:
            if(stat.is_solution()):
                self.path.append(stat)

                while(stat.parent != None):
                    self.path.append(stat.parent)
                    stat = stat.parent
                break

            stat.add_child()
            for child in stat.child:
                self.states.append(child)
    
    def show_path(self):
        for pat in self.path:
            pat.print_self()
                                 
def main():
    newSolution = solution()
    newSolution.test_solution()
    newSolution.show_path()
main()
