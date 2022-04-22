 #cannibals and missionaries

class state:
    def __init__(self, missionaries, cannibals, side):
        self.missionaries = missionaries
        self.cannibals = cannibals
        self.side = side
        self.parent = None
        self.child = []
    
    def print_self(self):
        print("missionaries: ", self.missionaries, "cannibals: ", self.cannibals, "side: ", self.side)

    def is_solution(self):
        if self.missionaries == 0 and self.cannibals == 0:
            return True
        else:
            return False

    def state_is_valid(self):
        if self.missionaries >= 0 and self.cannibals >= 0 and self.missionaries >= self.cannibals and self.side >= 0:
            return True
        else:
            return False

    def add_child(self):
        moves = [[1, 0], [2, 0], [0, 1], [0, 2], [1, 1]]
        self.side = 0

        if self.side == 0:
            self.side = 1
        else:
            self.side = 0

        for move in moves:
            
            missionaries_left = 0
            cannibals_left = 0
            missionaries_right = 0
            cannibals_right = 0
            new_state = None

            if(self.side == 0):
                missionaries_left = self.missionaries - move[0]
                missionaries_right = self.missionaries + move[0] - missionaries_left
                
                cannibals_left = self.cannibals - move[1] 
                cannibals_right = self.cannibals + move[1] - cannibals_left

                new_state = state(missionaries_left, cannibals_left, self.side)
            else:
                missionaries_right = self.missionaries - move[0] 
                missionaries_left = self.missionaries + move[0]- missionaries_right

                cannibals_right = self.cannibals - move[1]
                cannibals_left = self.cannibals + move[1] - cannibals_right

                new_state = state(missionaries_right, cannibals_right, self.side)

            new_state.parent = self

            if(new_state.state_is_valid()):
                self.child.append(new_state)
                
class solution:
    def __init__(self):
        self.new_state = state(3,3,0)
        self.states = []
        self.path = []

        self.states.append(self.new_state)

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
